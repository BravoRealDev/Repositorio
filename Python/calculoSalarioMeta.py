nomeVendedor = str(input("Informe o nome do vendedor: "))
salarioFixo = float(input("Informe o salário fixo do vendedor: "))
totalVendas = float(input("Informe o valor total de vendas do vendedor: "))

salarioTotal = (totalVendas * 0.05) + salarioFixo

print(f"O total é = R$ {salarioTotal:.2f}")