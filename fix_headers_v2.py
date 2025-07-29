#!/usr/bin/env python3
import re

def fix_duplicate_headers():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Encontrar todos os headers usando um padrão mais específico
    header_pattern = r'<!-- Header com Logo e Navegação -->\s*<header>.*?</header>'
    headers = re.findall(header_pattern, content, re.DOTALL)
    
    print(f"Encontrados {len(headers)} headers")
    
    if len(headers) > 1:
        print("Removendo headers duplicados...")
        
        # Manter apenas o primeiro header
        first_header = headers[0]
        
        # Substituir todos os headers subsequentes por string vazia
        for i in range(1, len(headers)):
            content = content.replace(headers[i], '', 1)
        
        # Salvar o arquivo corrigido
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(content)
        
        print("Headers duplicados removidos com sucesso!")
        
        # Verificar se ainda há headers duplicados
        with open('index.html', 'r', encoding='utf-8') as f:
            new_content = f.read()
        
        remaining_headers = re.findall(header_pattern, new_content, re.DOTALL)
        print(f"Headers restantes: {len(remaining_headers)}")
        
    else:
        print("Nenhum header duplicado encontrado.")

if __name__ == "__main__":
    fix_duplicate_headers() 