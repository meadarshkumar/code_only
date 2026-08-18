// #include<iostream>
// using namespace std;
// int main ()
// {
//     for(int j= 3; j> 0; j= j-1 )
//     {
//         for(int i =0; i<10; i= i+3)
//         {
//             cout<<(i+j)<<",";
//         }
//         cout<<endl;
//     }
// }


// #include<iostream>
// using namespace std;
// int main()
// {
//     for(int i = 0; i<5; i++)
//         {
//             cout<<i;
//          for(int j=0; j<5; j++)
//              {
//                 cout<<" *";
//              }
//              cout<<endl;
//         }
        
//     return 0;
// }



// #include<iostream>
// using namespace std ;
// int main ()
// {
//     int m, n;
//     cin>>n;
//     cin>>m;
//     for (int i= 0; i <= n; i++)
//        {
//     for(int j= 0; j <= m; j++ )
//     {
//            cout<<" *";
//     }
//     cout<<endl;       
//        }
// }


// #include<iostream>
// using namespace std;
// int main (){
//     int n;
//     cin>>n;
//     for(int row = 1; row<=n; row++ )
//     {
//        for(int col= 1; col<=row; col++ )
//        {
//        cout<<"* ";
//        }
//     cout<<endl;
//     }
// }

// #include<iostream>
// using namespace std;
// int main ()
// {
// int n;
// cin>>n;
// for (int row= 1; row<=n; row++)
//      {
//         if( row == 1 || row == n)
//         {
//         for(int col= 1; col<=n; col++)
//               {
//                cout<<" *" ;
//               }
//         }
//        else 
//        {
//                 cout<<" *"; 
                
//             for(int col= 1; col<= (n-2); col++)
//             {
//                 cout<<"  ";
//             }
//                 cout<<" *";
//        } 
//     cout<<endl;
// }
// }


// # include <iostream>
// using namespace std;
// int main()
// {
// int N;
// int M;
// cin>>N;
// cin>>M;

// for(int i = 1; i<=N; i++)
//  {
//    if ( i == 1 || i== N )
//    { 
//     for(int a =1; a<= M; a++)
//          cout<<" *";
//    }
 
//     else{
        
//          cout<<" *";

//     for(int j = 1; j<=(M-2); j++)
//     {
//          cout<<"  ";
//     }
//          cout<<" *";
//         }
//         cout<<endl;
//  }
// }



// #include<iostream>
// using namespace std;
// int main()
// {
//     int N;
//     cin>>N;
   
//     for (int i = 1; i<= N; i++)
//     {
//         for(int j= 1; j<= i; j++)
//         {
//         cout<<" *";
//         }
//         cout<<endl;
//     }
//     return 0;
// }




// #include <iostream>
// using namespace std;
// int main()
//     {
//   int N;
//   cin>>N;
//      for (int i =1; i<=N; i++)
//        {
//         if (i == 1 || i== 2||i == N)
//         {
//             for (int j=1; j<=i; j++)
//             {
//             cout<<" *";
//             }
//         }
//         else 
//         {
//            cout<<" *";
//            for(int j = 1; j<= i-2; j++)
//            {
//             cout<<"  ";
//            }
//            cout<<" *";
//         }
//         cout<<endl;
//     }
//     return 0;
//     }



// #include<iostream>
// using namespace std;
// int main ()
// {
//     int  N;
//     cin>>N;
//     for(int i=1; i<= N; i++)
//     {
//       for(int j=1; j<=(N-i+1); j++)
//       {
//         cout<<"* ";
//       }
//       cout<<endl;
//     }

// return 0;
// } 


#include<iostream>
using namespace std;
int main ()
{
int n;
cin>>n;
for (int i =1; i<=n; i++)
{
    for(int j= 1; j<=(n-i); j++)
    {
        cout<<"  ";
    }
    for(int a = 1; a<=(i*2-1); a++)
    {
        cout<<" *";

    }
    cout<<endl;
}
}



// #include<iostream>
// using namespace std;
// int main ()
// {
//     int  N;
//     cin>>N;

//     for(int i =1; i<=N; i++)
//     {
//         for(int j =1; j<=(i-1); j++)
//         {
//             cout<<"  ";
//         }
//         for( int h =1; h<=(2*N -(2*i-1)); h++)
//         { 
//             cout<<" *";
//         }
//         cout<<endl;
//     }
// }



// #include <iostream>
// using namespace std;
// int main ()
// {
// int NO;
// cin>>NO;
// for (int i=1; i<=NO; i++)
// {
//     for(int j=1; j<=i; j++)
//     {
//         cout<<" "<<i;

//     }
//   cout<<endl;
// }
//     return 0;
// }



// #include <iostream>
// using namespace std ;
// int main()
// {
//     int n;
//     cin>>n;
//     int count=1;
//     for(int i=1; i<=n; i++)
//     {
//        for(int j=1; j<= i; j++)
//        { 
//         cout<<count<<" ";
//         count++;
//        }
//        cout<<endl;
//     }
// } 




// #include<iostream>
// using namespace std;
// int main()
// {
//     int n;
//     cin>>n;
//     for(int i= 1; i<=n; i++)
//     {

//       for(int s =1; s<=n-i; s++)
//       {
//         cout<<"  ";
//       }
//        if(i==1)
//        {
//            cout<<" *";
//        }
//        else if(i == n)
//        {
//            for(int j=1; j<=(2*n-1); j++)
//            {
//             cout<<" *";
//            }
//        }
//        else
//        {
//         cout<<" *";

//         for(int h =1; h<=(2*i-3); h++)
//         {
//            cout<<"  ";
//         }
//         cout<<" *";
//        }
//         cout<<endl;
//     }
// }



