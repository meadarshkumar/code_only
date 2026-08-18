// Debug the code. Take input a character,
//  print 1,  if its a capital alphabet,
//  print 0, if its a lowercase alphabet, else print -1.



// #include<iostream>
// using namespace std;

// int main() {
// 	char c;
//     cin>>c;
//     if('a'<=c && c<= 'z'){
//         cout<<0;
//     }
// 	else if('A'<=c && c<= 'Z'){
//         cout<<1;
//     }
//     else{
//         cout<<-1;
//     }
// }



// #include<iostream>
// using namespace std;

// int main()
// {  int count =1;
//    int N;
//    cin>>N;
//     for(int i =1; i <=N; i++)
//     {
//         for(int j=1; j<=i; j++)
//            {
//                    cout<<count<<" ";
//                    count++;
//            }
//            cout<<endl;
//     }

  
// }



// #include<iostream>
// using namespace std;
// int main ()
// {
//   int N;
//   cout<<"Enter no of line ";
//   cin>>N;
  
//   for(int A = 1; A<=N; A++)
//   {
//     for(int B = 1; B<=(N-A); B++)
//     {
//        cout<<"  ";
//     }
//     for(int B = 1; B<=(A*2-1); B++)
//     {
//         cout<<" *";
//     }
//     cout<<endl;
//   }
  
// }


# include <iostream>
using namespace std;
 
class solution {
  public:

  int sumofDigits(int num )
  {
    int sum = 0;
    while (num != 0){
    int digit  = num % 10 ;

    sum = sum + digit ;
     
    num = num / 10 ;
    }
    return sum ;
  }
  
};

int main (){
  solution obj ;
  int n;
  cout<<" enter a number ";
  cin>> n;
  cout<<" sum of digits ="<< obj.sumofDigits(n)<< endl;
  return 0;
}
7