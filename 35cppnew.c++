#include <iostream>
using namespace std;

int main() {
    int N;
    cout << "How many numbers? ";
    cin >> N;

    long long product = 1;   // Use long long to handle large products
    int number;

    for (int i = 0; i < N; i++) {
        cout << "Enter number " << i + 1 << ": ";
        cin >> number;
        product *= number;   // Multiply each number
    }

    cout << "Product = " << product << endl;

    return 0;
}