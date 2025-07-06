#include <stdio.h>
#include <stdlib.h>
#include <string.h>

typedef struct Loja {
    char nome[50];
    struct Loja* proximo;
} Loja;

typedef struct {
    Loja* inicio;
} RotaEntrega;

// Cria nova loja
Loja* criar_loja(const char* nome) {
    Loja* nova = (Loja*)malloc(sizeof(Loja));
    if (nova == NULL) { //verifica se a alocação de memória falhou
        printf("Erro de alocação de memória!\n");
        exit(1);
    }
    
    strcpy(nova->nome, nome); //copia o nome da loja para o novo nó
    nova->proximo = NULL;     //inicializa o próximo como NULL
       
    return nova;
}

// Insere no início da lista
void inserir_inicio(RotaEntrega* rota, const char* nome_loja) {
    Loja* nova_loja = criar_loja(nome_loja);
    nova_loja->proximo = rota->inicio;
    rota->inicio = nova_loja;
}

// Insere na posição específica
void inserir_na_posicao(RotaEntrega* rota, const char* nome_loja, int posicao) {
    if (posicao == 0) {
        inserir_inicio(rota, nome_loja);
        return;
    }

    Loja* atual = rota->inicio;
    int i = 0;
    //vai até o nó anterior
    while (atual != NULL && i < posicao - 1) {
        atual = atual->proximo;
        i++;
    }

    if (atual == NULL) {
        printf("Posição inválida: %d\n", posicao);
        return;
    }
    
    Loja* nova_loja = criar_loja(nome_loja);    //cria a nova loja
    nova_loja->proximo = atual->proximo;      //aponta para o próximo da loja atual
    atual->proximo = nova_loja;               //aponta para a nova loja    
}

// Imprime a rota
void imprimir_rota(RotaEntrega* rota) {
    Loja* atual = rota->inicio;
    while (atual != NULL) {
        printf(" %s\n", atual->nome);
        atual = atual->proximo;
    }
}

// Libera memória da rota
void liberar_rota(RotaEntrega* rota) {
    Loja* atual = rota->inicio;
    while (atual != NULL) {
        Loja* temp = atual;
        atual = atual->proximo;
        free(temp);
    }
}

int main() {
    RotaEntrega rota;
    rota.inicio = NULL;

    
    inserir_inicio(&rota, "Loja D");    
    inserir_inicio(&rota, "Loja B");    
    inserir_inicio(&rota, "Loja A");
    
    inserir_na_posicao(&rota, "Loja C", 2);

    printf("Rota final:\n");
    imprimir_rota(&rota);

    liberar_rota(&rota);

    return 0;
}