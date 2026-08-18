#include<iostream>
using namespace std ;
int main ()
{
   int A;
   int B;
   int C;
   cout<<"enter no here ="<<endl;
   cin>>A>>B>>C;
   if (A>B)
   {
    if (A>C)
    {
        cout<<"A is gratest no";
    }
   }
   else if (B>C)
   {
    cout<<"B is gratest no";
   }
   else
     cout<<" C is gratest no";
     return 0;
}