//  function 

//     #include<iostream>
//     using namespace std ;

//     int sum (int a,  int b){
//         int totalsum = a + b;
//         return totalsum;
//     }
//     void printmyname (){
//         cout<< "Adarsh"<<endl;
//     }
// int main ()
// {
//    int ans = sum(8, 9);
//    cout<< ans << endl;

//    printmyname();

//    int secans = sum(9, 6);
//    cout<< secans << endl; 

//    printmyname ();

// return 0;
// }





// #include <iostream>
// using namespace std ;

// int multiplication (int a, int b, int c)
// {
//     int totalmultiplication = a*b*c;
//     return totalmultiplication;
// }
// int main ()
// {
//     int ans = multiplication (8, 5, 3);
//     cout<< ans <<endl;
    
//     int aans = multiplication (9, 5, 5);
//     cout<< aans <<endl;
//     return 0;
// }



// #include<iostream>
// using namespace std;

// void printmynametentimes ()
// {
//    for (int i=1; i<=10; i++)
//    cout<<"Adarsh"<<endl;
// }


// int main  (){


// printmynametentimes();
// printmynametentimes();

//     return 0;

// } 



// #include<iostream>
// using namespace std;

// void printmultiples (int num)
// {
//       for (int i = 1; i <=10; i++)
//       cout << i* num <<endl;
// }
// int main()
// {
//     printmultiples (6);
// }





// #include<iostream>
// using namespace std;


// char convertintouppercase (char ch)
// {
//    char ans = ch - 'a'+ 'A';
//    return ans;
// }


// int main()
// {
//     char answer = convertintouppercase ('o');
//     cout<< answer << endl;
//     return 0;
// }





// #include <iostream>
// using namespace std;


// int squareofano (int A)
// {
//     int answer = A*A;
//     return answer;
// }

// int main ()
// {
//     int ans = squareofano (9);
//     cout<< ans<< endl;

//     int ans1 = squareofano (2);
//     cout<< ans1 << endl;

//     return 0;
// }




#include <iostream>
using namespace std;

void oddeven ( int a)
{ if (a == 0)
    {
    cout<<"zero";
    }
   else if(a%2 != 0)
    {
    cout <<"odd no";
    }
    else 
    cout <<"even no";
    
}

int main ()
{
    int A;
    cout<<"Enter the no you want to check =";
    cin>>A;

    oddeven(A);

    return 0;
}
