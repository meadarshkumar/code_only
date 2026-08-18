#include<iostream>
using namespace std;
int main(){
    int A;
    cin>>A;
    for (int i = 0; i < A; i++)
    {
        for (int j = 0; j < A-i; j++)
        {
            cout<<j+1;
        }
        cout<<endl;
    }
    
}