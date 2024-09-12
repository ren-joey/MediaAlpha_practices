#
# Hello World Program in Perl
# Write a Perl function that takes in a password and checks whether it's valid. The password should follow the following rule:
#
#    Passwords must be at least 8 characters long.
#    Between 8-11: requires mixed case letters, numbers and symbols
#    Between 12-15: requires mixed case letters and numbers
#    Between 16-19: requires mixed case letters
#    20+: any characters desired
#

use FindBin;

# Print the message for the valid password
sub PassMsg
{
    print "[Valid] This password can be used. ($_[0])\n" ;
}

# Print the invalid message
sub InvalidMsg
{
    print "[Invalid] Password does not meet the requirements. ($_[0])\n"
}

# Check if the password contains both uppercase and lowercase
sub AllInOneCheck
{
    return $_[0] =~ /^(((?=.{8})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\W).*)|((?=.{12})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*)|((?=.{16})(?=.*[A-Z])(?=.*[a-z]).*)|((?=.{20}).*))$/;
}

# Main function for password validation
sub PasswordChecker
{
    my $pwd = $_[0];
    $len = length($pwd);

    $pass = AllInOneCheck($pwd);
    if ($pass) { PassMsg($pwd); }
    else { InvalidMsg($pwd); }
}

# Get file location by relative path
$relpath = "./passwords";
$fullpath = "$FindBin::Bin/$relpath";
open(FH, '<', $fullpath) or die $!;

# Get every line inside of the file "./password";
while(<FH>) {
    my $pwd = $_;
    # Remove the control specifier: [ENTER]
    $pwd =~ s/\R//g;
    PasswordChecker($pwd);
}
close(FH);