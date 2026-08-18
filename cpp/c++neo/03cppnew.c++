#include <iostream>
using namespace std;
int main()
{
    int num1;
    int num2;
    int num3;
    cout<<"enter_number_here"<<endl;
     cin>>num1>>num2>>num3;
     if(num1>num2)
      {  
         if(num1>num3)
         {
     cout<<"Number_1_is_greatest";
         }
      }
     else if (num2>num3)
        {
      cout<<"Number_2_is_greatest";
        }
      else 
      {
      cout<<"Number_3_is_greatest";
      }

}