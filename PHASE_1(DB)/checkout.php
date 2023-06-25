<!DOCTYPE html>
<html>
<head>
  <title>Checkout</title>
  <style>
    table {
      border-collapse: collapse;
    }
    th, td {
      padding: 8px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background-color: #f2f2f2;
    }
  </style>
</head>
<body>
  <h1>Order Summary</h1>
  
  <table>
    <tr>
      <th>Item</th>
      <th>Price</th>
      <th>Quantity</th>
    </tr>
    <tr>
      <td><?php echo $_GET["main"]; ?></td>
      <td><?php echo "$".getPrice($_GET["main"], "main"); ?></td>
      <td><?php echo $_GET["quantity"]; ?></td>
    </tr>
    <tr>
      <td><?php echo $_GET["side"]; ?></td>
      <td><?php echo "$".getPrice($_GET["side"], "side"); ?></td>
      <td><?php echo $_GET["quantity"]; ?></td>
    </tr>
    <tr>
      <td><?php echo $_GET["drink"]; ?></td>
      <td><?php echo "$".getPrice($_GET["drink"], "drink"); ?></td>
      <td><?php echo $_GET["quantity"]; ?></td>
    </tr>
  </table>

  <?php
    $totalCost = ($_GET["total"]) ? $_GET["total"] : 0;
    echo "<p>Total Cost: $$totalCost</p>";
  ?>

</body>
</html>

<?php
  function getPrice($itemName, $itemType) {
    $conn = mysqli_connect("localhost", "root", "") or die("Unable to connect!" . mysqli_error());
    mysqli_select_db($conn, "dbmenu");
    
    $query = "SELECT price FROM main_menu WHERE item = '$itemName' AND type = '$itemType'";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
    
    return $row['price'];
  }
?>

