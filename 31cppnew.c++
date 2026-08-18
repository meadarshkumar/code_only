#include<iostream>
using namespace std;
int main()
{
int A;
cout<<"Enter the Value = ";
cin>>A;
if(A%5 == 0 && A%9 == 0)
{
    cout<<"The number is divisible by both 5 and 11";
}
else 
{
    cout<<"The number is not divisible by both 5 and 11";
}
return 0;

}
