#include<iostream>
using namespace std;
 int main (){
    int numofrow;
    cin>>numofrow;
    for (int i = 0; i < numofrow; i++)
    {
        for (int j = 0; j < numofrow-i; j++)
        {
            cout<<"*";
        }
        cout<<endl;
    }
    

 }