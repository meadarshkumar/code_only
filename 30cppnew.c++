#include<iostream>
using namespace std;
 int main ()
 {

  int A, B;
  char op;

  cout<<"Enter first No =";
  cin>>A;

  cout<<"Enter second No =";
  cin>>B;

  cout<<"Enter operator =";
  cin>>op;
  
switch(op)
{
    case '+':
    cout<<"Result = "<<A+B;
    break;

    case '-':
    cout<<"Result = "<<A-B;
    break;
     
    case '*':
    cout<<"Result = "<<A*B;
    break;

    case '/':
    if(B !=0)
    {
    cout<<"Result = "<<A/B;
    }
    else 
    {
    cout<<" Divison is not possible";
    }
    break;

    defult:
 
    cout<<" Invalid Operator";
}

return 0;

 }