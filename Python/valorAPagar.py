codPeca1 = str(input())
numPecas1 = int(input())
valorUnit1 = float(input())
codPeca2 = str(input())
numPecas2 = int(input())
valorUnit2 = float(input())

valorAPagar = (numPecas1 * valorUnit1) + (numPecas2 * valorUnit2)

print(f"VALOR A PAGAR: R$ {valorAPagar:.2f}")