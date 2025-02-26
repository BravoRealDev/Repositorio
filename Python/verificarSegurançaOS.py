import os
import subprocess
import platform
import sys
import socket

def verificar_atualizacoes_sistema(sistema_operacional):
  """Verifica se há atualizações pendentes no sistema operacional."""
  print("Verificando atualizações do sistema...")
  try:
    if sistema_operacional == "Windows":
      comando = "powershell -command Get-Hotfix"
      resultado = subprocess.check_output(comando, shell=True, text=True)
      if "KB" not in resultado:
        print("  AVISO: Nenhuma atualização de segurança recente detectada.  Recomenda-se verificar e instalar as atualizações do Windows.\n")
      else:
        print("  Sistema operacional atualizado.\n")

    elif sistema_operacional == "Linux":
      try:
        subprocess.check_call(["apt-get", "update"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        comando = "apt list --upgradable"
        resultado = subprocess.check_output(comando, shell=True, text=True)
        if "upgradable" in resultado:
          print("  AVISO: Há pacotes que precisam ser atualizados.\n  Execute 'sudo apt-get upgrade' para instalar as atualizações de segurança.\n")
        else:
          print("  Sistema operacional atualizado.\n")
      except FileNotFoundError:
          try:
            subprocess.check_call(["yum", "check-update"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            comando = "yum list updates"
            resultado = subprocess.check_output(comando, shell=True, text=True)
            if "updates" in resultado:
              print("  AVISO: Há pacotes que precisam ser atualizados.\n  Execute 'sudo yum update' para instalar as atualizações de segurança.\n")
            else:
              print("  Sistema operacional atualizado.\n")
          except FileNotFoundError:
            print("  AVISO: Não foi possível verificar atualizações (apt ou yum não encontrados).\n")
    else:
      print("  AVISO: Verificação de atualizações não suportada para este sistema operacional.\n")

  except subprocess.CalledProcessError as e:
    print(f"  Erro ao verificar atualizações: {e}\n")
  except Exception as e:
    print(f"  Erro inesperado ao verificar atualizações: {e}\n")


def verificar_firewall(sistema_operacional):
  """Verifica o status do firewall no sistema operacional."""
  print("Verificando status do firewall...")
  try:
    if sistema_operacional == "Windows":
      comando = "powershell -command Get-NetFirewallProfile -Profile Domain,Public,Private | Format-Table -Property Name, Enabled"
      resultado = subprocess.check_output(comando, shell=True, text=True)
      print(resultado)
      if "True" not in resultado:
        print("  AVISO: O firewall do Windows parece estar desativado.  Ative-o para proteger seu sistema.\n")
      else:
        print("  Firewall ativo.\n")
    elif sistema_operacional == "Linux":
      try:
        comando = "sudo ufw status"
        resultado = subprocess.check_output(comando, shell=True, text=True)
        print(resultado)
        if "Status: active" not in resultado:
          print("  AVISO: UFW está inativo.  Recomenda-se ativá-lo com 'sudo ufw enable'.\n")
        else:
          print("  Firewall ativo (UFW).\n")
      except FileNotFoundError:
        print("  AVISO: UFW não encontrado. Verifique se o firewall está ativo de outra forma.\n")
      except subprocess.CalledProcessError:
        print("  AVISO: Não foi possível verificar o status do UFW (talvez precise de sudo).\n")
    else:
      print("  AVISO: Verificação de firewall não suportada para este sistema operacional.\n")
  except subprocess.CalledProcessError as e:
    print(f"  Erro ao verificar o status do firewall: {e}\n")
  except Exception as e:
    print(f"  Erro inesperado ao verificar o status do firewall: {e}\n")

def verificar_antivirus(sistema_operacional):
  """Verifica se há um software antivírus instalado (Windows apenas)."""
  print("Verificando software antivírus (verificação básica)...")
  if sistema_operacional == "Windows":
    try:
      comando = "powershell -command Get-ComputerInfo | Select-Object -Property *antivirus*"
      resultado = subprocess.check_output(comando, shell=True, text=True, stderr=subprocess.PIPE)
      if "Antivirus" in resultado:
        print("  Software antivírus detectado (verificação básica).  Verifique se está atualizado e ativo.\n")
      else:
        print("  AVISO: Nenhum software antivírus detectado (verificação básica).  Recomenda-se instalar um software antivírus.\n")
    except subprocess.CalledProcessError as e:
      print(f"  Erro ao verificar o antivírus: {e}")
      print(f"  Código de saída: {e.returncode}")
      print(f"  Saída de erro do PowerShell:\n{e.stderr}")

      if e.returncode == 1:
        print("  Dica: Verifique a sintaxe do comando PowerShell.")
      elif e.returncode == 3:
        print("  Dica: Execute o script como administrador.")

    except Exception as e:
      print(f"  Erro inesperado ao verificar o antivírus: {e}\n")
  else:
    print("  Verificação de antivírus não suportada para este sistema operacional (Windows apenas).\n")

def verificar_portas_abertas():
  """Verifica as portas abertas comuns no sistema."""
  print("Verificando portas abertas comuns (simplificado)...")
  portas_comuns = [21, 22, 23, 25, 80, 110, 135, 139, 443, 445, 3389, 8080]
  print("  AVISO: Essa verificação não é exaustiva e não detecta todos os serviços em execução.\n")

  try:
    for porta in portas_comuns:
      sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
      sock.settimeout(0.5)
      try:
        resultado = sock.connect_ex(('localhost', porta))
        if resultado == 0:
          print(f"  AVISO: Porta {porta} está aberta.  Verifique se o serviço é necessário e configure o firewall adequadamente.\n")
        sock.close()
      except socket.error:
        pass
  except Exception as e:
    print(f"  Erro ao verificar portas abertas: {e}\n")


def verificar_seguranca():
  """
  Realiza uma verificação básica de segurança no sistema e sugere correções.
  """
  print("Iniciando verificação de segurança...\n")
  sistema_operacional = platform.system()
  print(f"Sistema Operacional: {sistema_operacional}\n")

  verificar_atualizacoes_sistema(sistema_operacional)
  verificar_firewall(sistema_operacional)
  verificar_antivirus(sistema_operacional)
  verificar_portas_abertas()

  print("\nVerificação de segurança concluída.")


if __name__ == "__main__":
  verificar_seguranca()