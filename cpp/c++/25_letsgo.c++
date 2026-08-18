#include<iostream>
using namespace std;
int main(){
    int A;
    cout<<"enter no of row:";
    cin>>A;
    for (int i = 0; i <A ; i=i+1)
    {
        for (int j = 0; j < i+1 ; j=j+1)
        {
            cout<<j+1;
        }
        cout<<endl;
    }
    
}