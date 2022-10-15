const lang = [
  {
    ext: "py",
    name: "python",
    BoilerPlate: `print("Hey Codie!")`,
  },
  {
    ext: "cpp",
    name: "cpp",
    //TODO add support for bits/stdc++.h header file
    BoilerPlate: `#include<iostream>
using namespace std;

int main()
{
    cout<<"Hey Codie!"<<endl;
    return 0;
}`,
  },
  {
    ext: "java",
    name: "java",
    BoilerPlate: `public class Main {
    public static void main(String args[]) {
        System.out.println("Hey Codie!");
    }
}`,
  },
  {
    ext: "js",
    name: "javascript",
    BoilerPlate: `/* 
    Use INPUT variable to get stdin.
    Try console.log(INPUT);
*/
console.log('Hey Codie!');`,
  },
];

export default lang;
