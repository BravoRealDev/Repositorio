import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.text.DecimalFormat;

public class CalculadoraCientificaGUI extends JFrame implements ActionListener {

    private JTextField display;
    private JButton[] numberButtons;
    private JButton[] functionButtons;
    private JButton addButton, subButton, mulButton, divButton;
    private JButton decButton, equButton, delButton, clrButton, negButton;
    private JButton sinButton, cosButton, tanButton, logButton, powButton, sqrtButton;
    private JPanel panel;

    Font myFont = new Font("Arial", Font.PLAIN, 25);

    double num1 = 0, num2 = 0, result = 0;
    char operator;

    public CalculadoraCientificaGUI() {
        setTitle("Calculadora Científica");
        setSize(600, 800); // Aumentei a altura para acomodar os botões de funções
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLayout(null);
        getContentPane().setBackground(new Color(240,240,240)); //Fundo Cinza Claro.

        display = new JTextField();
        display.setBounds(50, 25, 500, 75);
        display.setFont(myFont);
        display.setEditable(false);
        display.setHorizontalAlignment(JTextField.RIGHT);
        add(display);

        numberButtons = new JButton[10];
        for (int i = 0; i < 10; i++) {
            numberButtons[i] = new JButton(String.valueOf(i));
            numberButtons[i].setFont(myFont);
            numberButtons[i].addActionListener(this);
        }

        functionButtons = new JButton[12]; // Aumentado para acomodar as funções trigonométricas e outras
        addButton = new JButton("+");
        subButton = new JButton("-");
        mulButton = new JButton("*");
        divButton = new JButton("/");
        decButton = new JButton(".");
        equButton = new JButton("=");
        delButton = new JButton("Del");
        clrButton = new JButton("Clear");
        negButton = new JButton("+/-");
        sinButton = new JButton("Sin");
        cosButton = new JButton("Cos");
        tanButton = new JButton("Tan");
        logButton = new JButton("Log");
        powButton = new JButton("x^y");
        sqrtButton = new JButton("Sqrt");


        functionButtons[0] = addButton;
        functionButtons[1] = subButton;
        functionButtons[2] = mulButton;
        functionButtons[3] = divButton;
        functionButtons[4] = decButton;
        functionButtons[5] = equButton;
        functionButtons[6] = delButton;
        functionButtons[7] = clrButton;
        functionButtons[8] = negButton;
        functionButtons[9] = sinButton;
        functionButtons[10] = cosButton;
        functionButtons[11] = tanButton;
        functionButtons[12] = logButton;
        functionButtons[13] = powButton;
        functionButtons[14] = sqrtButton;

        for (int i = 0; i < functionButtons.length; i++) {
            if (functionButtons[i] != null) { // Check for null before setting properties
                functionButtons[i].addActionListener(this);
                functionButtons[i].setFont(myFont);
                functionButtons[i].setFocusable(false);
            }
        }

        delButton.setBounds(250, 125, 140, 50);
        clrButton.setBounds(410, 125, 140, 50);

        add(delButton);
        add(clrButton);

        panel = new JPanel();
        panel.setBounds(50, 200, 500, 500);
        panel.setLayout(new GridLayout(6, 4, 10, 10)); // Aumentei o número de linhas para acomodar mais botões
        panel.setBackground(new Color(240,240,240)); //Fundo Cinza Claro

        panel.add(numberButtons[1]);
        panel.add(numberButtons[2]);
        panel.add(numberButtons[3]);
        panel.add(addButton);
        panel.add(numberButtons[4]);
        panel.add(numberButtons[5]);
        panel.add(numberButtons[6]);
        panel.add(subButton);
        panel.add(numberButtons[7]);
        panel.add(numberButtons[8]);
        panel.add(numberButtons[9]);
        panel.add(mulButton);
        panel.add(decButton);
        panel.add(numberButtons[0]);
        panel.add(negButton);
        panel.add(divButton);
        panel.add(sinButton);
        panel.add(cosButton);
        panel.add(tanButton);
        panel.add(equButton);
        panel.add(logButton);
        panel.add(powButton);
        panel.add(sqrtButton);



        add(panel);
        setVisible(true);
        setLocationRelativeTo(null); // Centraliza a janela
    }

    public static void main(String[] args) {
        new CalculadoraCientificaGUI();
    }

    @Override
    public void actionPerformed(ActionEvent e) {

        for (int i = 0; i < 10; i++) {
            if (e.getSource() == numberButtons[i]) {
                display.setText(display.getText().concat(String.valueOf(i)));
            }
        }
        if (e.getSource() == decButton) {
            if (!display.getText().contains(".")) {
                display.setText(display.getText().concat("."));
            }
        }
        if (e.getSource() == addButton) {
            num1 = Double.parseDouble(display.getText());
            operator = '+';
            display.setText("");
        }
        if (e.getSource() == subButton) {
            num1 = Double.parseDouble(display.getText());
            operator = '-';
            display.setText("");
        }
        if (e.getSource() == mulButton) {
            num1 = Double.parseDouble(display.getText());
            operator = '*';
            display.setText("");
        }
        if (e.getSource() == divButton) {
            num1 = Double.parseDouble(display.getText());
            operator = '/';
            display.setText("");
        }
         if (e.getSource() == powButton) {
            num1 = Double.parseDouble(display.getText());
            operator = '^';
            display.setText("");
        }
        if (e.getSource() == sinButton) {
            num1 = Double.parseDouble(display.getText());
            result = Math.sin(Math.toRadians(num1)); // Converte para radianos
            DecimalFormat df = new DecimalFormat("#.####");
            display.setText(df.format(result));
        }

        if (e.getSource() == cosButton) {
            num1 = Double.parseDouble(display.getText());
            result = Math.cos(Math.toRadians(num1)); // Converte para radianos
             DecimalFormat df = new DecimalFormat("#.####");
            display.setText(df.format(result));
        }

        if (e.getSource() == tanButton) {
            num1 = Double.parseDouble(display.getText());
            result = Math.tan(Math.toRadians(num1)); // Converte para radianos
             DecimalFormat df = new DecimalFormat("#.####");
            display.setText(df.format(result));
        }

        if (e.getSource() == logButton) {
            num1 = Double.parseDouble(display.getText());
            result = Math.log(num1);
            DecimalFormat df = new DecimalFormat("#.####");
            display.setText(df.format(result));
        }
        if (e.getSource() == sqrtButton) {
            num1 = Double.parseDouble(display.getText());
            result = Math.sqrt(num1);
             DecimalFormat df = new DecimalFormat("#.####");
            display.setText(df.format(result));
        }


        if (e.getSource() == equButton) {
            num2 = Double.parseDouble(display.getText());
            switch (operator) {
                case '+':
                    result = num1 + num2;
                    break;
                case '-':
                    result = num1 - num2;
                    break;
                case '*':
                    result = num1 * num2;
                    break;
                case '/':
                    if (num2 == 0) {
                        display.setText("Erro: Divisão por zero");
                        return;
                    }
                    result = num1 / num2;
                    break;
                 case '^':
                    result = Math.pow(num1, num2);
                    break;

            }
            DecimalFormat df = new DecimalFormat("#.####");
            display.setText(df.format(result));
            num1 = result;
        }
        if (e.getSource() == clrButton) {
            display.setText("");
        }
        if (e.getSource() == delButton) {
            String string = display.getText();
            display.setText("");
            if (string.length() > 0) {
                display.setText(string.substring(0, string.length() - 1));
            }
        }
        if (e.getSource() == negButton) {
            double temp = Double.parseDouble(display.getText());
            temp *= -1;
            display.setText(String.valueOf(temp));
        }
    }

    // Métodos das operações (podem ser movidos para uma classe utilitária ou interface se necessário)
    public static double adicionar(double num1, double num2) {
        return num1 + num2;
    }

    public static double subtrair(double num1, double num2) {
        return num1 - num2;
    }

    public static double multiplicar(double num1, double num2) {
        return num1 * num2;
    }

    public static double dividir(double num1, double num2) {
        if (num2 == 0) {
            System.out.println("Erro: Divisão por zero não permitida.");
            return Double.NaN; // Retorna "Not a Number" para indicar erro
        }
        return num1 / num2;
    }

    public static double seno(double num) {
        double numEmRadianos = Math.toRadians(num); // Converte para radianos
        return Math.sin(numEmRadianos);
    }

    public static double cosseno(double num) {
        double numEmRadianos = Math.toRadians(num); // Converte para radianos
        return Math.cos(numEmRadianos);
    }

    public static double tangente(double num) {
        double numEmRadianos = Math.toRadians(num);
        return Math.tan(numEmRadianos);
    }

    public static double logaritmo(double num) {
        return Math.log(num);
    }

    public static double potencia(double base, double expoente) {
        return Math.pow(base, expoente);
    }

    public static double raizQuadrada(double num) {
        return Math.sqrt(num);
    }
}