#include<iostream>
using namespace std;
int main (){
    int rows;
    int cols;
    cout<<"enter rows here:";
    cin>>rows;
    cout<<"enter cols here:";
    cin>>cols;
    for (int row= 0; row < rows; row=row+1)
    {
        for (int col = 0; col < cols; col=col+1)
        {
           if (row==0  ||  row==rows-1 )
           {
            cout<<"* ";
           }
        else if (col==0 || col==cols-1)
        {
            cout<<"* ";
        }
        else
        {
           cout<<"  ";
        }
        
        
         }
         cout<<endl;
        
    }
    
}