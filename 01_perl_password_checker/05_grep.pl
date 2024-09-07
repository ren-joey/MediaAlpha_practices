@names = ('Jacob', 'Joey', 'Scott', 'Peter', '123', 'P1');
@grepNames = grep(/[a-z]$/, @names);
print "@grepNames\n";

$str = "perl practicing by myself!";
$str =~ m/by/;
print "Brfore: $`\n";
print "Matched: $&\n";
print "After: $'\n";

$str = "National Taiwan University";
$str =~ s/National Taiwan/I-Shou/;
print "Brfore: $`\n";
print "Matched: $&\n";
print "After: $'\n";
print "$str\n";

$str = "10001";
$str =~ s/0/9/;
print "$str\n";
$str =~ tr/0/9/;
print "$str\n";