<?php
  $conn = mysqli_connect("localhost", "root", "") or die("Unable to connect!" . mysqli_error());
  mysqli_select_db($conn, "dbmenu");
  
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $quantity = $_POST["quantity"];
    $mainItem = $_POST["main"];
    $sideItem = $_POST["side"];
    $drinkItem = $_POST["drink"];
    
    $mainPrice = getPrice($mainItem, "main");
    $sidePrice = getPrice($sideItem, "side");
    $drinkPrice = getPrice($drinkItem, "drink");
    
    $totalCost = ($mainPrice + $sidePrice + $drinkPrice) * $quantity;
    
    header("Location: checkout.php?main=$mainItem&side=$sideItem&drink=$drinkItem&quantity=$quantity&total=$totalCost");

    exit();
  }
  
  function getPrice($itemName, $itemType) {
    global $conn;
    
    $query = "SELECT price FROM main_menu WHERE item = '$itemName' AND type = '$itemType'";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
    
    return $row['price'];
  }
?>

<!DOCTYPE html>
<html>
<head>
  <title>Combo Meal Assembler</title>
</head>
<body>
  <h1>Combo Meal Assembler</h1>
  <h2>Select your items:</h2>
  
  <div id="menu">
    <form method="POST" action="<?php echo $_SERVER['PHP_SELF']; ?>">
      <h3>Main:</h3>
      <select id="main" name="main">
        <?php
          $query = "SELECT * FROM main_menu WHERE type = 'main'";
          $result = mysqli_query($conn, $query);

          while ($row = mysqli_fetch_assoc($result)) {
            $itemName = $row['item'];
            $price = $row['price'];
            echo "<option value='$itemName'>$itemName ($price)</option>";
          }
        ?>
      </select>

      <h3>Side:</h3>
      <select id="side" name="side">
        <?php
          $query = "SELECT * FROM main_menu WHERE type = 'side'";
          $result = mysqli_query($conn, $query);

          while ($row = mysqli_fetch_assoc($result)) {
            $itemName = $row['item'];
            $price = $row['price'];
            echo "<option value='$itemName'>$itemName ($price)</option>";
          }
        ?>
      </select>

      <h3>Drink:</h3>
      <select id="drink" name="drink">
        <?php
          $query = "SELECT * FROM main_menu WHERE type = 'drink'";
          $result = mysqli_query($conn, $query);

          while ($row = mysqli_fetch_assoc($result)) {
            $itemName = $row['item'];
            $price = $row['price'];
            echo "<option value='$itemName'>$itemName ($price)</option>";
          }
        ?>
      </select>

      <h3>Quantity:</h3>
      <input type="number" id="quantity" name="quantity" value="1" min="1"><br><br>
      
      <button type="submit">Order</button>
    </form>
  </div>
  
</body>
</html>
