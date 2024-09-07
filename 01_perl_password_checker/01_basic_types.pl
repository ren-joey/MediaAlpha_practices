$scalar = 1;
@array = ("1", 2, "3");
%hash = ("4" => 4, "5" => 5, "6" => 6);

print "$scalar\n";
print "$array[0], $array[1], $array[2]\n";
print "$hash{'4'}, $hash{'5'}\n";

$str1 = 'a';
$str2 = 'b';
$str3 = $str1  . ', ' . $str2;
$str4 = 'a' x 5;
$str5 = $str1;
$str5++;
print "$str3, $str4, $str5\n";

$str6 = "1.2P34";
$str6++;
print "$str6\n";

@names = ("peter", "joey", "kelly", "steven");
@new_names[0, 1, 2] = @names[-1, -2, 0];
print "$names[-1]\n";
print "$new_names[0], $new_names[1], $new_names[2]\n";

@list1 = (1, 3..10, 13);
@list2 = (1.1..6.3);
print @list1;
print "\n";
print "@list2\n";
@list3 = (ad..bz);
print "@list3\n";

@list4 = (4, 5, 1, 3);
@sorted_list4 = sort @list4;
@reverse_sorted_list4 = reverse sort @list4;
print "@list4\n";
print "@sorted_list4\n";
print "@reverse_sorted_list4\n";

$string_join = join (" ", "I", "am", "learning");
print "$string_join\n";

@list5 = ("I", "am");
$string_join = join (" ", @list5, "learning");
print "$string_join\n";

$string = "I::am::learning";
@split_str = split (/::/, $string);
print "@split_str\n";
