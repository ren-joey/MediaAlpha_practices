%leaders = ('india' => 'peter', 'taiwan' => 'joey');
@places = keys %leaders;
@names = values %leaders;
print "@places\n@names\n";

while (($key, $val) = each %leaders) {
    print "$key => $val\n";
}