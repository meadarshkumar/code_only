#include<iostream>
using namespace std;
int main ()
{
    char CH;
    cout<<"Enter alphabet =";
    cin>>CH;
    if(CH == 'a'|| CH == 'e' || CH == 'i' || CH == 'o' || CH == 'u' ||
    CH == 'A' || CH == 'E' || CH == 'I' || CH == 'O' || CH == 'U' )
    {
        cout<<" It's a vowel ";

    }
    else
    {
        cout<<" Its a consonant";

    }
 return 0;

}