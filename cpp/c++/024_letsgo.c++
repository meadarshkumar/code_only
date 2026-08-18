#include <iostream>
using namespace std;
int main ()
{
  int d;
  cout<<"enter row= " ;
  cin>>d;
  for (int i = 0; i <d; i++)
  {
    for (int j = 0; j < d-i; j++)
    {
        cout<<" * ";
    }
    cout<<endl;
  }
  
}