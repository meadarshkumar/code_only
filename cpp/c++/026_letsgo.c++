#include<iostream>
using namespace std;
int main ()
{
 int S;
 cout<<"enter row =";
 cin>>S;
 for (int i = 0; i < S; i++)
 {
    for (int j = 0; j < S-i; j++)
    {
        cout<<j+1;
    }
    cout<<endl;
 }
 

}