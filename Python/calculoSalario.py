numFuncionario = int(input("Informe o número do funcionário: "))
horasTrabalhadas = float(input("Informe as horas trabalhadas: "))
valorHora = float(input("Qual o valor da hora do colaborador? "))

salario = valorHora * horasTrabalhadas

print("Funcionário número: ", numFuncionario)
print(f"Salário de R$ {salario:.2f}")