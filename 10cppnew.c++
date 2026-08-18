#include <iostream>
using namespace std;
int main (){
    int j;
    cout<<"which table do you want to print =";
    cin>>j;
    for(int i=1; i<=10; i=i+1)
    {
        cout<<j*i<<endl;
    }
    return 0;
}