# Estrutura de Pastas – Documentos do MVP

apps/
└── documents/
    ├── __init__.py
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── serializers.py
    ├── urls.py
    ├── views.py
    ├── services/
    │   ├── __init__.py
    │   ├── generator.py       # Funções de geração
    │   ├── converter.py       # Conversão (pdf, docx, etc.)
    │   └── storage.py         # Upload/download (S3)
    ├── templates/             # Modelos de documentos
    │   ├── __init__.py
    │   ├── declaracoes/
    │   │   ├── residencia.json
    │   │   ├── rendimento.json
    │   │   ├── escolaridade.json
    │   │   └── ...
    │   ├── contratos/
    │   │   ├── compra_venda_automovel.json
    │   │   ├── compra_venda_imovel.json
    │   │   ├── prestacao_servicos.json
    │   │   ├── arrendamento.json
    │   │   └── ...
    │   ├── faturas/
    │   │   ├── fatura_simples.json
    │   │   ├── fatura_comercial.json
    │   │   ├── fatura_proforma.json
    │   │   ├── nota_entrega.json
    │   │   └── recibo.json
    │   └── cvs/
    │       ├── cv_basico.json
    │       ├── cv_profissional.json
    │       ├── cv_multilingue.json
    │       └── ...
    └── tests/
        ├── test_documents.py
        ├── test_generator.py
        └── test_templates.py
