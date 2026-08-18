// #include<iostream>
// using namespace std;
// int main ()
// {
//     int A;
//     cout<<"Number =";
//     cin>>A;
//     if(A>0)
//     {
//      cout<<"postive No";
//     }
//     else if(A<0)
//     {
//         cout<<"Negative No";
//     }
//   else
//    {
//     cout<<"Zero";
//    }
// }




     #include <iostream>
using namespace std;

int main() {
    float principal, rate, time, simpleInterest;

    cout << "Enter Principal amount: ";
    cin >> principal;

    cout << "Enter Rate of interest: ";
    cin >> rate;

    cout << "Enter Time (in years): ";
    cin >> time;

    simpleInterest = (principal * rate * time) / 100;

    cout << "Simple Interest = " << simpleInterest;

    return 0;
}
