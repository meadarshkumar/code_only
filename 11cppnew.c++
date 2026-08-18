#include <iostream>
using namespace std;
int main(){
    int M;
    int N;
    cout<<"Enter row =";
    cin>>M;
    cout<<"Enter colm =";
    cin>>N;
    for(int i=0; i<M; i=i+1)
    { 
        for(int j=0; j<N; j=j+1)
        {
          if(i==0 || i==M-1)
            {
            cout<<"* ";
            }
           else if (j==0 || j==N-1)
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