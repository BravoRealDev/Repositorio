import socket
import time

def scan_port(ip, port):
    try:
       
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)        
        sock.settimeout(1)        
        result = sock.connect_ex((ip, port))        
        if result == 0:
            print(f"Porta {port} está ABERTA")
        else:
            print(f"Porta {port} está FECHADA ou FILTRADA")        
        sock.close()
    except Exception as e:
        print(f"Erro ao escanear a porta {port}: {e}")

def port_scanner():
   
    target = input("Digite o IP ou hostname (ex: 127.0.0.1): ")
    
    start_port = int(input("Porta inicial (ex: 20): "))
    end_port = int(input("Porta final (ex: 100): "))

    print(f"\nEscaneando {target} de {start_port} até {end_port}...\n")    
    
    for port in range(start_port, end_port + 1):
        scan_port(target, port)        
        time.sleep(0.1)

if __name__ == "__main__":
    port_scanner()