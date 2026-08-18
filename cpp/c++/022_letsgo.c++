#include<iostream>
using namespace std ;
int main ()
{
    int o;
    int p;
   cout<<"enter row= " ;
   cin>>o;
   cout<<"enter colm= ";
   cin>>p;
for (int i = 0; i < o ; i++)
{
    for(int j = 0; j < p; j++)
    {
        if (i==0 || i==o-1)
        {
            cout<<"* ";
        }
        else if (j==0 || j==p-1)
        {
            cout<<"* ";
        }
        else 
        cout<<"  ";
    }
    cout<<endl;
}


}
