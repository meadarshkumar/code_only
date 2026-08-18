#include<iostream>
using namespace std;
int main ()
{
    int marks;
    cout<<"Enter marks of student =";
    cin>>marks;
    if(marks>=90)
    {
        cout<<"Grade 'A'"<<endl;
    }
    else if (marks>=80)
    {
        cout<<"Grade 'B'"<<endl;
    }
    else if (marks>=60)
    {
        cout<<"Grade 'C'"<<endl;
    }
    else if(marks>=40)
    {
        cout<<"Grade 'D'"<<endl;
    }
    else
    {
        cout<<"'Fail'";
    }

    return 0;
}