#include<iostream>
using namespace std;
int main()
{
 int A;
 cout<<"enter row =";
 cin>>A;
 for (int i = 0; i < A; i++)
 {
    for (int j = 0; j < i+1; j++)
    {
        cout<<j+1;
    }
    cout<<endl;
 }
 
}