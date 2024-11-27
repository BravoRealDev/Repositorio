import math

raio = float(input("Informe o raio: "))
area = math.pi * raio**2
area_arredondada = round(area, 4)
print("A=", area_arredondada)