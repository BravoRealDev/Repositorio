import socket
import time

# Função pra escanear uma única porta
def scan_port(ip, port):
    try:
        # Cria um objeto socket
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        # Define um timeout pra não ficar esperando muito
        sock.settimeout(1)
        # Tenta conectar ao IP e porta
        result = sock.connect_ex((ip, port))
        # Se result = 0, a porta está aberta
        if result == 0:
            print(f"Porta {port} está ABERTA")
        else:
            print(f"Porta {port} está FECHADA ou FILTRADA")
        # Fecha a conexão
        sock.close()
    except Exception as e:
        print(f"Erro ao escanear a porta {port}: {e}")

# Função principal
def port_scanner():
    # IP que você quer escanear (exemplo: seu próprio roteador ou localhost)
    target = input("Digite o IP ou hostname (ex: 127.0.0.1): ")
    # Intervalo de portas pra escanear
    start_port = int(input("Porta inicial (ex: 20): "))
    end_port = int(input("Porta final (ex: 100): "))

    print(f"\nEscaneando {target} de {start_port} até {end_port}...\n")
    
    # Loop pra escanear cada porta no intervalo
    for port in range(start_port, end_port + 1):
        scan_port(target, port)
        # Pequena pausa pra não sobrecarregar
        time.sleep(0.1)

# Executa o scanner
if __name__ == "__main__":
    port_scanner()