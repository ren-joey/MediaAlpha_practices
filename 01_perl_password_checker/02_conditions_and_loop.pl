# use Switch;

$num = 1;

while ($num < 15) {
    if ($num > 10) {
        print "Over 10\n";
    } elsif ($num < 5) {
        print "Below 5\n";
    } else {
        print "Between 5 and 10\n";
    }
    $num = $num + 1;
}

for ($a = 10; $a < 15; $a = $a + 1) {
    print("Value of a is: $a\n");
}

$string = "TEST";
@arr = split (//, $string);
$size = @arr;
for ($a = 0; $a < $size; $a = $a + 1) {
    print $arr[$a];
}
print "\n";

foreach $char (@arr) {
    print $char;
}
print "\n";

$var = 10;
@array = (10, 20, 30);
%hash = ('key1' => 10, 'key2' => 20);

# switch($var){
#    case 10           { print "number 10\n"; next; }
#    case "a"          { print "string a" }
#    case [1..10,42]   { print "number in uncontinuous list" }
#    case (\@array)    { print "number in array" }
#    case (\%hash)     { print "number in hash" }
#    else              { print "no match" }
# }