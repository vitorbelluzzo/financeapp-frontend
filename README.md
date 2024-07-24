
### Estrutura de Dados
#### Tabelas: -> FEITO

1. **Usuários**
   - ID (Primary Key)
   - Nome
   - Email
   - Senha (hash)

2. **Caixa**
   - ID (Primary Key)
   - Usuário_ID (Foreign Key)
   - Descrição
   - Valor
   - Tipo (Entrada/Saída)
   - Data

3. **Meses**
   - ID (Primary Key)
   - Usuário_ID (Foreign Key)
   - Mês
   - Ano
   - Entrada_Total
   - Saída_Total
   - Restante
   - Percentual_Gasto (default 90%)
   - Percentual_Economia (default 10%)

4. **Transações**
   - ID (Primary Key)
   - Mês_ID (Foreign Key)
   - Descrição
   - Valor
   - Tipo (Entrada/Saída)
   - Data

### Telas do Web App

#### 1. Tela de Login e Registro -> FEITO
   - **Login**: Formulário de login (Email e Senha)
   - **Registro**: Formulário de registro (Nome, Email e Senha)

#### 2. Dashboard
   - **Visão Geral do Caixa**
     - campo com informações sobre o caixa atual, rentabilidade 
     - Formulário para adicionar nova transação (Descrição, Valor, Tipo, Data)
   - **Visão Geral Mensal**
     - Dropdown para selecionar o mês e ano
     - Exibição das somas de entradas, saídas e total restante
     - Opções para ajustar percentuais de gastos e economia

#### 3. Detalhes Mensais
   - **Entradas e Saídas do Mês**
     - Tabelas separadas para entradas e saídas
     - Formulários para adicionar novas entradas e saídas (Descrição, Valor, Data)
     - Somatórios no final de cada tabela
   - **Resumo Mensal**
     - Exibição do total de rendimentos, total de despesas, total restante, percentual de gastos e percentual de economia
     - Formulário para ajustar percentuais de gastos e economia

### Componentes do Frontend

#### 1. Componente de Transação
   - Campos: Descrição, Valor, Tipo, Data
   - Botão para adicionar transação

#### 2. Componente de Resumo
   - Exibição de somatórios (rendimentos totais, despesas totais, total restante)
   - Exibição de percentuais ajustáveis (gasto e economia)

#### 3. Componente de Tabela
   - Tabela para listar transações com colunas (Descrição, Valor, Data)
   - Somatório no final da tabela

#### 4. Formulário de Ajuste de Percentuais
   - Campos para ajuste dos percentuais de gastos e economia

### Fluxo de Navegação

1. **Login/Registro**
   - Usuário se registra ou faz login.
   - Após o login, redireciona para o Dashboard.

2. **Dashboard**
   - Exibe a visão geral do caixa e o resumo do mês atual.
   - Links para detalhes mensais e adicionar transações no caixa.

3. **Detalhes Mensais**
   - Exibe as tabelas de entradas e saídas para o mês selecionado.
   - Exibe o resumo mensal com a opção de ajustar percentuais.

### Próximos Passos

1. **Configuração do Projeto**
   - Configure o projeto Next.js com TypeScript.
   - Configure Tailwind CSS.
   - Configure Supabase.

2. **Implementação das Telas**
   - Comece pelas telas de login e registro.
   - Implemente o dashboard com a visão geral do caixa e do mês.
   - Crie as telas de detalhes mensais.

3. **Conexão com Supabase**
   - Configure a autenticação de usuários.
   - Implemente a lógica para adicionar e listar transações do caixa e mensalmente.

4. **Teste e Ajustes**
   - Teste todas as funcionalidades.
   - Faça ajustes conforme necessário.

