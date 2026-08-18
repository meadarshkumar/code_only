

#include<iostream>  

using namespace std;

int main (){

    int ROW;

    cout<<"enter row here:";

    cin>>ROW;

    for (int i= 0; i < ROW; i=i+1)
    {
    for (int j= 0; j < i+1; j++)
    {
        cout<<" * ";
    }
    cout<<endl;
    }


}