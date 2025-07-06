#include <stdio.h>
 
#define tamanho 10
 
struct tpilha {
            int dados[tamanho];
            int topo;
};
 
struct tpilha pilha;
 
void pilha_mostrar() {
            int i;
            printf("[ ");
            for (i = 0; i < pilha.topo; i++) {
                        printf("%d ", pilha.dados[i]);
            }
            printf("]\n\n");
}
