import socket
import psutil
import os

def fechar_porta(porta):
  
  try:    
    processos = [
        proc for proc in psutil.process_iter(['pid', 'name', 'connections'])
        for conn in proc.info['connections']
        if conn.laddr.port == porta and conn.status == 'LISTEN'
    ]

    if not processos:
      print(f"Nenhum processo encontrado usando a porta {porta}.")
      return

    for processo in processos:
      pid = processo.info['pid']
      nome_processo = processo.info['name']

      print(f"Processo usando a porta {porta}: PID={pid}, Nome={nome_processo}")
      
      try:
        processo_obj = psutil.Process(pid)  
        processo_obj.terminate()
        processo_obj.wait(timeout=5)  
        print(f"Processo com PID {pid} (porta {porta}) encerrado com sucesso.")

      except psutil.NoSuchProcess:
        print(f"Processo com PID {pid} não existe mais.")
      except psutil.TimeoutExpired:
        print(f"Não foi possível encerrar o processo com PID {pid} (porta {porta}) a tempo. Tentando matar...")
        try:
          processo_obj.kill()
          processo_obj.wait(timeout=5)
          print(f"Processo com PID {pid} (porta {porta}) morto com sucesso.")
        except Exception as e:
          print(f"Erro ao matar o processo com PID {pid} (porta {porta}): {e}")
      except Exception as e:
        print(f"Erro ao encerrar o processo com PID {pid} (porta {porta}): {e}")

  except Exception as e:
    print(f"Erro ao fechar a porta {porta}: {e}")

if __name__ == "__main__":
  porta_para_fechar = int(input("Digite o número da porta que deseja fechar: "))
  fechar_porta(porta_para_fechar)