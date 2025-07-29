#!/usr/bin/env python3
import re

def fix_duplicate_headers():
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Encontrar todos os headers
    header_pattern = r'<!-- Header com Logo e Navegação -->\s*<header>.*?</header>'
    headers = re.findall(header_pattern, content, re.DOTALL)
    
    if len(headers) > 1:
        print(f"Encontrados {len(headers)} headers duplicados")
        
        # Manter apenas o primeiro header
        first_header = headers[0]
        
        # Substituir todos os headers pelo primeiro
        for i, header in enumerate(headers):
            if i == 0:
                continue  # Manter o primeiro
            content = content.replace(header, '', 1)
        
        # Salvar o arquivo corrigido
        with open('index.html', 'w', encoding='utf-8') as f:
            f.write(content)
        
        print("Headers duplicados removidos com sucesso!")
    else:
        print("Nenhum header duplicado encontrado.")

if __name__ == "__main__":
    fix_duplicate_headers() 