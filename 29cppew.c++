#include <iostream>
using namespace std;
 int main ()
 {
 int Marks;
 cout<< "students Marks =";
 cin>>Marks;
 if(Marks >= 80)
 {
    cout<<"Student grade = A";
 }
 else if(Marks >= 60)
 {
    cout<<"Student grade = B";
 }
else if(Marks >= 40)
{
    cout<<"Student grade = C";
}
else
{
    cout<<"Student grade = D";
}

    return 0;
 }
 