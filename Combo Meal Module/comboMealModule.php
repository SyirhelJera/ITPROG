<?php
$host = 'localhost';
$user = 'root';
$pass = '';
$dbname = 'cmadb';

$mysqli = new mysqli($host, $user, $pass, $dbname);

if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

function getComboMealsWithDishNames($mysqli) {
    $query = "SELECT c.combo_id, c.discount, m1.name AS main_dish, m2.name AS side_dish, m3.name AS drink FROM combomeals c
              JOIN menu m1 ON c.cmainID = m1.id
              JOIN menu m2 ON c.csideID = m2.id
              JOIN menu m3 ON c.cdrinksID = m3.id";
    $result = $mysqli->query($query);
    $combomeals = array();
    while ($row = $result->fetch_assoc()) {
        $combomeals[] = $row;
    }
    return $combomeals;
}

function deleteComboMeal($mysqli, $combo_id) {
    $query = "DELETE FROM combomeals WHERE combo_id = $combo_id";
    $mysqli->query($query);
}

function addComboMeal($mysqli, $discount, $cmainID, $csideID, $cdrinksID) {
    $query = "SELECT combo_id FROM combomeals WHERE cmainID = $cmainID AND csideID = $csideID AND cdrinksID = $cdrinksID";
    $result = $mysqli->query($query);
    if ($result->num_rows > 0) {
        echo "<p class='error'> Error: The combination already exists in the database.</p>";
        return;
    }
    $query = "INSERT INTO combomeals (discount, cmainID, csideID, cdrinksID) VALUES ($discount, $cmainID, $csideID, $cdrinksID)";
    $mysqli->query($query);
}
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["add_combo"])) {
    $discount = $_POST["discount"];
    $cmainID = $_POST["cmainID"];
    $csideID = $_POST["csideID"];
    $cdrinksID = $_POST["cdrinksID"];
    addComboMeal($mysqli, $discount, $cmainID, $csideID, $cdrinksID);
}

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST["delete_combo"])) {
    $combo_id = $_POST["combo_id"];
    deleteComboMeal($mysqli, $combo_id);
}

$combomeals = getComboMealsWithDishNames($mysqli);

?>

<!DOCTYPE html>
<html>
<head>
    <title>Combo Meals Admin Page</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
    <div class="container">
        <h1>Combo Meals Editor</h1>
    </div>
    <div class="D">
        <table>
            <tr>
                <th>Combo ID</th>
                <th>Discount</th>
                <th>Main Dish</th>
                <th>Side Dish</th>
                <th>Drink</th>
                <th>Delete</th>
            </tr>
            <?php foreach ($combomeals as $combomeal) : ?>
            <tr>
                <td><?= $combomeal['combo_id'] ?></td>
                <td><?= $combomeal['discount'] ?> %</td>
                <td><?= $combomeal['main_dish'] ?></td>
                <td><?= $combomeal['side_dish'] ?></td>
                <td><?= $combomeal['drink'] ?></td>
                <td>
                    <form method="post">
                        <input type="hidden" name="combo_id" value="<?= $combomeal['combo_id'] ?>">
                        <input class="button" type="submit" name="delete_combo" value="Delete">
                    </form>
                </td>
            </tr>
            <?php endforeach; ?>
        </table>
    </div>

    <div class="D">
        <form method="post" class="clean-form">
            <h2>Add New Combo Meal</h2>
            <div class="form-group">
                <label for="discount">Discount:</label>
                <input type="text" name="discount" required>
            </div>
            <div class="form-group">
                <label for="cmainID">Main Dish:</label>
                <select name="cmainID" required>
                    <?php
                    $menuQuery = "SELECT id, name FROM menu WHERE category='Main'";
                    $menuResult = $mysqli->query($menuQuery);
                    while ($mainDish = $menuResult->fetch_assoc()) {
                        echo "<option value=\"" . $mainDish['id'] . "\">" . $mainDish['name'] . "</option>";
                    }
                    ?>
                </select>
            </div>
            <div class="form-group">
                <label for="csideID">Side Dish:</label>
                <select name="csideID" required>
                    <?php
                    $menuQuery = "SELECT id, name FROM menu WHERE category='Side'";
                    $menuResult = $mysqli->query($menuQuery);
                    while ($sideDish = $menuResult->fetch_assoc()) {
                        echo "<option value=\"" . $sideDish['id'] . "\">" . $sideDish['name'] . "</option>";
                    }
                    ?>
                </select>
            </div>
            <div class="form-group">
                <label for="cdrinksID">Drink:</label>
                <select name="cdrinksID" required>
                    <?php
                    $menuQuery = "SELECT id, name FROM menu WHERE category='Drink'";
                    $menuResult = $mysqli->query($menuQuery);
                    while ($drink = $menuResult->fetch_assoc()) {
                        echo "<option value=\"" . $drink['id'] . "\">" . $drink['name'] . "</option>";
                    }
                    ?>
                </select>
            </div>
            <div class="form-group">
                <input class="button" type="submit" name="add_combo" value="Add Combo Meal">
            </div>
        </form>
    </div>
</body>
</html>

<?php
$mysqli->close();
?>
