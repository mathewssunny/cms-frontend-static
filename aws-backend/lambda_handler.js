const AWS = require('aws-sdk');
const ses = new AWS.SES({ region: 'eu-west-2' }); // Set your desired AWS region

exports.handler = async (event) => {
    console.log('Event received:', JSON.stringify(event));

    // Parse the body if it's a string (standard for API Gateway proxy)
    const data = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
    const { name, email, phone, service, date, message } = data;

    // Validate email source - this MUST be verified in AWS SES
    const sourceEmail = 'stevenagecoolpics@gmail.com';

    const emailParams = {
        Destination: {
            ToAddresses: [sourceEmail],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `
                        <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
                            <h2 style="color: #ff5722; border-bottom: 2px solid #eee; padding-bottom: 10px;">New Website Inquiry</h2>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Email:</strong> ${email}</p>
                            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
                            <p><strong>Service:</strong> ${service}</p>
                            <p><strong>Preferred Date:</strong> ${date || 'Not provided'}</p>
                            <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px;">
                                <strong>Message:</strong><br>
                                ${message.replace(/\n/g, '<br>')}
                            </div>
                        </div>
                    `
                },
                Text: {
                    Charset: "UTF-8",
                    Data: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nDate: ${date}\nMessage: ${message}`
                }
            },
            Subject: {
                Charset: "UTF-8",
                Data: `CoolPicsUK Inquiry: ${service} - ${name}`
            }
        },
        Source: sourceEmail,
        ReplyToAddresses: [email]
    };

    try {
        await ses.sendEmail(emailParams).promise();
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            },
            body: JSON.stringify({ message: "Inquiry sent successfully!" })
        };
    } catch (error) {
        console.error('SES Error:', error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            },
            body: JSON.stringify({ message: "Internal server error", error: error.message })
        };
    }
};
