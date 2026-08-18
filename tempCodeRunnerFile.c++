


#include<iostream>
using namespace std;
int main ()
{
    int  N;
    cin>>N;

    for(int i =1; i<=N; i++)
    {
        for(int j =1; j<=(i-1); j++)
        {
            cout<<"  ";
        }
        for( int h =1; h<=(2*N -(2*i-1)); h++)
        { 
            cout<<" *";
        }
        cout<<endl;
    }
}
