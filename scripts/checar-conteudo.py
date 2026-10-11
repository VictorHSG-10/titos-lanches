#!/usr/bin/env python3
"""Lista o conteúdo de exemplo do index.html que ainda precisa virar dado real.

Sai com código 1 enquanto houver pendência. Rode antes de publicar.
"""
import re
import sys
from pathlib import Path

RAIZ = Path(__file__).resolve().parent.parent
PAGINA = RAIZ / "index.html"
SCRIPT = RAIZ / "js" / "pagina.js"
NUMERO_EXEMPLO = "5521999990000"


def sem_comentarios(html):
    # Troca cada comentário por quebras de linha para manter a numeração das linhas.
    return re.sub(r"<!--.*?-->", lambda m: "\n" * m.group().count("\n"), html, flags=re.S)


def main():
    html = sem_comentarios(PAGINA.read_text(encoding="utf-8"))
    pendencias = []

    for numero, linha in enumerate(html.splitlines(), start=1):
        for rotulo in re.findall(r'data-exemplo="([^"]*)"', linha):
            pendencias.append(f"linha {numero}: {rotulo}")
        for marcador in re.findall(r"\[NEED:[^\]]*\]", linha):
            pendencias.append(f"linha {numero}: {marcador}")

    usos_numero = html.count(NUMERO_EXEMPLO)
    if usos_numero:
        pendencias.append(f"número de WhatsApp de exemplo ({NUMERO_EXEMPLO}) em {usos_numero} links")

    if NUMERO_EXEMPLO in SCRIPT.read_text(encoding="utf-8"):
        pendencias.append(f"número de WhatsApp de exemplo na constante WHATSAPP do js/pagina.js (confira também HORARIO)")

    if 'property="og:image"' not in html:
        pendencias.append("falta og:image (imagem 1200x630 para compartilhamento)")

    if not pendencias:
        print("Nenhum conteúdo de exemplo. Pode publicar.")
        return 0

    print("Conteúdo de exemplo que ainda precisa de dados reais:")
    for pendencia in pendencias:
        print(f"  - {pendencia}")
    print(f"\n{len(pendencias)} pendência(s). Troque o conteúdo e remova o data-exemplo do elemento.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
