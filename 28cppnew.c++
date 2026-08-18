#include<iostream>
using namespace std;
int main ()
{
int leapyear;
cout<<"enter year =";
cin>>leapyear;

if (leapyear % 400 == 0 )
{
    cout<<" This is year is leap year "<<endl;
}
else if (leapyear % 100 == 0)
{
    cout<<" This year is not a leap year "<<endl;
}
else if( leapyear % 4 == 0)
{
    cout<<" This year is leap year "<<endl;
}
else
{
 cout<<" This year is not a leap year "<<endl;
}
return 0;
 }

    //  *** correct order ***

// A year is a leap year if:

// Divisible by 400 → Leap year

// Else if divisible by 100 → NOT leap year

// Else if divisible by 4 → Leap year

// Else → NOT leap year