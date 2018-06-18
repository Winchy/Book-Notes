#include <iostream>

int main() {
    int currentVal = 0, val = 0;
    if (std::cin >> currentVal) {
    	int cnt = 1;
    	while (std::cin >> val) {
    		if (val == currentVal) 
    			++cnt;
    		else {
    			std::cout << currentVal << " occurs " << cnt << " times" << std::endl;
    		}
    	}
    	std::cout << currentVal << " occurs " << cnt << " times" << std::endl;
    }
    return 0;
}