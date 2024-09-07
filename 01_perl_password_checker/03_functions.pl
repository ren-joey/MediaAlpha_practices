sub Fn
{
    $n = scalar(@_);
    $first_arg = $_[0];
    $second_arg = $_[1];

    print "total size: $n\n";
    for ($i = 0; $i < $n; $i = $i + 1) {
        print "$_[$i]\n";
    }
}

sub PrintList
{
    my @list = @_;
    print "@list\n";
}

@list = (20, 30);
Fn(10, "test", @list);
print "\n";
PrintList(@list);