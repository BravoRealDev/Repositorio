#include <stdio.h>
#include <stdlib.h>

//8 bytes = double
//4 bytes = int
//4 bytes = float
//1 byte = char
//1 byte = bool

//sizeof(tipo) -> retorna o tamanho em bytes do tipo
//malloc -> aloca um espaço de memória do tamanho especificado
//free -> libera o espaço de memória alocado

int main(){
    int *p;
    p = (int*) malloc(sizeof(int)); // Alocando espaço para um inteiro
    if (p ==NULL){
        printf("Erro!\n");
    }
    else{
        *p = 10;
        printf("p: %d\n", *p);
        free(p); // Liberando a memória alocada
    }
}