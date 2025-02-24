import socket
import time
from datetime import datetime

# Função pra escanear uma única porta
def scan_port(ip, port, file):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((ip, port))
        if result == 0:
            status = f"Porta {port} está ABERTA"
        else:
            status = f"Porta {port} está FECHADA ou FILTRADA"
        print(status)
        # Escreve no arquivo com timestamp
        file.write(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {status}\n")
        sock.close()
    except Exception as e:
        error_msg = f"Erro ao escanear a porta {port}: {e}"
        print(error_msg)
        file.write(f"[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] {error_msg}\n")

# Função principal
def port_scanner():
    target = input("Digite o IP ou hostname (ex: 127.0.0.1): ")
    start_port = int(input("Porta inicial (ex: 20): "))
    end_port = int(input("Porta final (ex: 100): "))

    # Cria (ou abre) um arquivo pra salvar os resultados
    with open("scan_results.txt", "a", encoding="utf-8") as file:
        # Escreve o cabeçalho no arquivo
        file.write(f"\n=== Escaneamento iniciado em {target} ({datetime.now().strftime('%Y-%m-%d %H:%M:%S')}) ===\n")
        print(f"\nEscaneando {target} de {start_port} até {end_port}...\n")

        # Loop pra escanear cada porta
        for port in range(start_port, end_port + 1):
            scan_port(target, port, file)
            time.sleep(0.1)

        # Finaliza o relatório no arquivo
        file.write(f"=== Escaneamento concluído em {datetime.now().strftime('%Y-%m-%d %H:%M:%S')} ===\n")

# Executa o scanner
if __name__ == "__main__":
    port_scanner()